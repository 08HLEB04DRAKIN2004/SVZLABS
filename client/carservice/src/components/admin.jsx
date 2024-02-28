// В вашем файле Admin.js
import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
    return (
        <div>
            <h1>Панель администратора</h1>
            <ul>
                <li>
                    <Link to="/admin-employee-access">Учет доступа сотрудников</Link>
                </li>
                {/* Добавьте другие ссылки на административные функции, если необходимо */}
            </ul>
        </div>
    );
}

export default Admin;
