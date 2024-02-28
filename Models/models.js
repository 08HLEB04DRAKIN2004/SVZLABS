import mongoose from 'mongoose';

// Схема пользователя
const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            maxlength: 32,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
UserSchema.index({ phoneNumber: 1 }, { unique: true });


const UserModel = mongoose.model('User', UserSchema);

// Схема департамента
const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// Модель департамента
const DepartmentModel = mongoose.model('Department', DepartmentSchema);

// Схема должности
const PositionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

// Модель должности
const PositionModel = mongoose.model('Position', PositionSchema);

// Схема опасной работы
const HazardousJobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

// Модель опасной работы
const HazardousJobModel = mongoose.model('HazardousJob', HazardousJobSchema);

const EmployeeAccessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    granted: {
        type: Boolean,
        default: false
    }
});


// Модель доступа сотрудника
const EmployeeAccessModel = mongoose.model('EmployeeAccess', EmployeeAccessSchema);

export default  { UserModel, DepartmentModel, PositionModel, HazardousJobModel, EmployeeAccessModel };
