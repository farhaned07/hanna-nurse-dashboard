# Hanna Nurse Dashboard (Mission Control)

This is the secure "Mission Control" frontend for the Hanna AI Nurse system.
It is built with React + Vite + Tailwind CSS.

## 🚀 Deployment (Vercel)

This repository is designed to be deployed to **Vercel**.

### Prerequisites
1.  **Backend URL**: The Hanna Backend must be deployed (e.g., on Railway) and accessible.
2.  **Nurse Token**: A secure shared secret string that matches the `NURSE_DASHBOARD_TOKEN` in the Backend's environment variables.

### Environment Variables
Set these in your Vercel Project Settings:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | The URL of your deployed Backend | `https://hanna-backend.railway.app` |
| `VITE_NURSE_TOKEN` | Auth token matching the backend | `han_ops_2024_secure_xyz` |

### Local Development

1.  Use Node v20+
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up local `.env`:
    ```bash
    cp .env.example .env
    ```
    (Edit `.env` to point to `http://localhost:3000` for local backend)
4.  Run dev server:
    ```bash
    npm run dev
    ```

## 🛡️ Security Note

This dashboard does **not** use User Authentication (Login/Password).
It uses a **Gateway Token** (`VITE_NURSE_TOKEN`) which assumes the user is an authorized station.
**Access Control**: Ensure the production URL is not public, or add Vercel Authentication (Middleware) if extra security is required.
