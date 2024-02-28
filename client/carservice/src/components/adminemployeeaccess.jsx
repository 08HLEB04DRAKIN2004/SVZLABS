import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployeeAccess, deleteEmployeeAccess, updateEmployeeAccess, fetchEmployeeAccess } from '../redux/slices/employeeAccess';

const EmployeeAccessPage = () => {
    const dispatch = useDispatch();
    const employeeAccess = useSelector(state => state.employeeAccess.employeeAccess);
    const [formData, setFormData] = useState({
        name: '',
        granted: false,
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(fetchEmployeeAccess());
            } catch (error) {
                setError(error.message || 'Произошла ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddRecord = () => {
        dispatch(createEmployeeAccess(formData));
        setFormData({ name: '', granted: false });
    };

    const handleDeleteRecord = (_id) => {
        dispatch(deleteEmployeeAccess(_id));
    };

    const handleEditRecord = (_id) => {
        const accessToEdit = employeeAccess.find(access => access._id === _id);
        if (accessToEdit) {
            setEditingId(_id);
            setFormData({
                name: accessToEdit.name,
                granted: accessToEdit.granted,
            });
        }
    };

    const handleUpdateRecord = async () => {
        if (editingId) {
            const url = `http://localhost:4444/employeeAccess/${editingId}/update`;
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) throw new Error('Network response was not ok.');
                // Обновите состояние или выполните другие действия после успешного обновления
                await dispatch(fetchEmployeeAccess()); // Перезагрузка данных, если необходимо
            } catch (error) {
                console.error('Ошибка обновления:', error);
                // Обработка ошибок, например, установка состояния ошибки
                setError(error.message);
            }
        } else {
            console.error('ID записи не определен');
        }
    };

    const isEditing = (access) => editingId === access._id;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Управление доступом сотрудников</h2>
            <form>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Доступ разрешен:
                    <input
                        type="checkbox"
                        name="granted"
                        checked={formData.granted}
                        onChange={handleFormChange}
                    />
                </label>
                {editingId ? (
                    <button type="button" onClick={handleUpdateRecord}>Обновить</button>
                ) : (
                    <button type="button" onClick={handleAddRecord}>Добавить</button>
                )}
            </form>
            <ul>
                {employeeAccess.map(access => (
                    <li key={access._id}>
                        <span>{access.name}</span>
                        <span>{access.granted ? 'Да' : 'Нет'}</span>
                        {isEditing(access) ? (
                            <>
                                <button onClick={() => handleUpdateRecord()}>Сохранить</button>
                                <button onClick={() => setEditingId(null)}>Отмена</button>
                            </>
                        ) : (
                            <button onClick={() => handleEditRecord(access._id)}>Редактировать</button>
                        )}
                        <button onClick={() => handleDeleteRecord(access._id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeAccessPage;
