# Security Specification: Besto Container Industries Blog Management System

## 1. Data Invariants

1. **Public Read Restriction**: Unauthenticated visitors or non-admins can only read blog posts whose `status == 'published'`. Drafts must never be readable by public visitors.
2. **Admin-Only Mutation**: Only authenticated, verified administrators can create, update, or delete blog posts, categories, or admin records.
3. **Admin Identification**: The administrator is authenticated via Firebase Auth where `request.auth.token.email_verified == true` and their email matches the bootstrapped admin (`santoshnavle2010@gmail.com`) or exists in `/admins/$(request.auth.uid)`.
4. **Field Boundaries & Type Safety**:
   - `title`: String, max 300 chars, non-empty.
   - `slug`: String, max 200 chars, matching `^[a-z0-9-]+$`.
   - `content`: String, max 50,000 chars.
   - `status`: String, strictly `'draft'` or `'published'`.
   - `category`: String, max 100 chars.
5. **Immutable Identifiers**: Document IDs must be alphanumeric strings <= 128 chars.
6. **No Client Side Privileges**: Custom claims are not trusted; admin state is determined strictly through verified email matching or database existence checks.

## 2. The "Dirty Dozen" Payloads (Designed to Break Security)

1. **Public Draft Snoop (GET /blog_posts/{id} where status == 'draft')**:
   - Actor: Unauthenticated visitor
   - Target: `/blog_posts/secret-upcoming-announcement`
   - Payload: Status is `'draft'`
   - Expected: `PERMISSION_DENIED`

2. **Public Draft Listing (LIST /blog_posts where status == 'draft')**:
   - Actor: Unauthenticated visitor
   - Target: Query without status filter or querying drafts
   - Expected: `PERMISSION_DENIED`

3. **Unauthenticated Blog Post Injection (CREATE /blog_posts/{id})**:
   - Actor: Unauthenticated attacker
   - Payload: `{"title": "Spam Article", "content": "buy now", "status": "published"}`
   - Expected: `PERMISSION_DENIED`

4. **Non-Admin Registered User Blog Modification (UPDATE /blog_posts/{id})**:
   - Actor: Authenticated user with email `hacker@random.com` (not an admin)
   - Payload: `{"title": "Hacked Title"}`
   - Expected: `PERMISSION_DENIED`

5. **Email Spoof Attack (CREATE /blog_posts/{id})**:
   - Actor: User with email `santoshnavle2010@gmail.com` but `email_verified == false`
   - Expected: `PERMISSION_DENIED`

6. **Ghost / Shadow Field Injection Attack**:
   - Actor: Authenticated Admin
   - Payload: Valid post payload plus `{"_shadowRootEscalation": true, "superUserOverride": 1}`
   - Expected: Blocked by schema validation / `hasOnly` fields constraint.

7. **Oversized String / Denial of Wallet Attack**:
   - Actor: Authenticated Admin or attacker attempting 2MB junk title
   - Payload: `{"title": "A".repeat(500000)}`
   - Expected: Blocked by `size() <= 300` constraint.

8. **Invalid Slug Format Attack**:
   - Actor: Attacker or malformed client
   - Payload: `{"slug": "../../../etc/passwd"}`
   - Expected: Blocked by regex `^[a-z0-9-]+$` check.

9. **Self-Elevated Admin Record Creation**:
   - Actor: Regular authenticated user `attacker123`
   - Target: `CREATE /admins/attacker123` with `{"role": "admin", "email": "attacker@fake.com"}`
   - Expected: `PERMISSION_DENIED`

10. **Public Category Write Attack**:
    - Actor: Anonymous visitor
    - Target: `CREATE /blog_categories/crypto`
    - Expected: `PERMISSION_DENIED`

11. **Malicious Delete Attack**:
    - Actor: Non-admin visitor or regular user
    - Target: `DELETE /blog_posts/standard-industrial-packaging-guide`
    - Expected: `PERMISSION_DENIED`

12. **Status Enum Corruption Attack**:
    - Actor: User sending invalid status
    - Payload: `{"status": "archived-super-admin-bypass"}`
    - Expected: Blocked by `incoming().status in ['draft', 'published']`.
