### `Net Worth Calculator`

A simple personal finance app to track **Assets**, **Liabilities**, and calculate your **Net Worth** in real-time. Built with **Laravel**, **React**, **Inertia.js**, and **SQLite**.

> 🔐 All data is user-specific and securely stored. Easy to use. Optimized for clarity, not complexity.

## 🚀 Features

- ✅ User registration and login (Laravel Breeze + Inertia.js)
- 💼 Add, edit, or delete **Assets** and **Liabilities**
- 📊 Live calculation of:
  - Total Assets
  - Total Liabilities
  - Net Worth = Assets - Liabilities
- 🖨️ Printable balance sheet summary (clean CSS)
- 📱 Responsive UI (mobile & desktop)
- 📄 Optional export to CSV/PDF

---

## 🛠️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Backend       | Laravel 10+ (PHP)  |
| Frontend      | React + Inertia.js |
| Styling       | TailwindCSS        |
| Auth          | Laravel Breeze     |
| Database      | SQLite             |
| Build Tool    | Vite               |

---

## ⚙️ Installation & Setup

### 📦 1. Install PHP, Composer, Laravel (No sudo required)

```bash
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
source $HOME/.bashrc
````

More info: [https://laravel.com/docs](https://laravel.com/docs)

### 📁 2. Clone the repository

```bash
git clone https://github.com/joseowino/net-worth-calculator.git
cd net-worth-calculator
```

### 🧪 3. Setup Laravel (Backend)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

Ensure `.env` contains:

```env
DB_CONNECTION=sqlite
DB_DATABASE=${PWD}/database/database.sqlite
```

Then:

```bash
touch database/database.sqlite
php artisan migrate
```

### ⚛️ 4. Setup React + Inertia (Frontend)

```bash
npm install
npm run dev
```

---

## 🧪 Running Locally

```bash
php artisan serve       # Laravel backend (http://127.0.0.1:8000)
npm run dev             # React frontend (auto-refresh)
```

Register an account and start adding assets/liabilities.

---

## 🔐 Authentication

Powered by [Laravel Breeze](https://laravel.com/docs/starter-kits#laravel-breeze) with Inertia/React stack:

* Secure session-based auth
* Protected balance routes
* Only logged-in users can see or modify their data

---

## 📊 Usage Guide

### ➕ Add an Asset or Liability

* Click "Add Asset" or "Add Liability"
* Enter name and amount in KES
* Submit — your balance sheet updates instantly!

### 📈 View Your Summary

Your dashboard displays:

| Assets               | Liabilities         | Net Worth       |
| -------------------- | ------------------- | --------------- |
| 💵 Bank: 120,000     | 💳 Loan: 75,000     | 🧾 Net: 100,000 |
| 📦 Inventory: 80,000 | 🧾 Payables: 25,000 |                 |

Totals and net worth auto-calculate.

### 🖨️ Print Summary

Click the "Print" button. The view is optimized using `@media print` CSS to remove buttons and focus on summary.

---

## 📂 Optional Features

* 🧾 Export to **CSV** or **PDF** (planned)
* 🌙 Dark Mode toggle
* 📊 Net Worth trends using charts

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See `LICENSE` file for details.

---

## 🔗 Resources

* [Laravel Docs](https://laravel.com/docs)
* [Inertia.js Docs](https://inertiajs.com/)
* [React Docs](https://reactjs.org/)
* [TailwindCSS](https://tailwindcss.com/)
* [SQLite Docs](https://www.sqlite.org/index.html)

---

## 🙋 Author

Made with ❤️ by [@joseowino](https://github.com/joseowino)

