# CareConnect Frontend – Full Function Prototype

Frontend-only React/Vite prototype for the CareConnect elderly-care system.

## Included SRS function groups

1. Account & profile management
- Register, login, logout
- Change password
- Update personal information
- Admin account list/detail/edit/delete
- Lock/unlock account
- Role assignment

2. Elderly information
- Add, view, update, delete
- Admin list/detail/update/delete

3. Caregiver
- Create/update caregiver profile
- Search/filter by area, skills, experience, working time
- View caregiver profile
- Admin list/detail/edit
- Caregiver verification

4. Care requests
- Create/update/view/cancel request
- View registered caregivers
- Accept/reject caregiver
- Caregiver register/unregister for request
- Admin list/detail
- Admin process inappropriate requests

5. Care schedule
- Create/update/view/cancel
- View history
- Caregiver confirmation
- Update care status

6. Reviews, notifications, messaging
- Submit/view reviews
- Admin moderate/delete reviews
- User notifications
- Admin notification create/update/manage
- Messaging UI

7. Website content & statistics
- List/add/edit/delete articles
- Statistics dashboard with tables/charts

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL, normally http://localhost:5173

This is a frontend demonstration. Data is stored in React state and is not connected to a backend/database.
