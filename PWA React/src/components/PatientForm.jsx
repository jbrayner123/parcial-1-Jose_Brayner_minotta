import React, { useState } from 'react';

export default function PatientForm({ onAddPatient, existingCCs = [] }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cc: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};

    // Validación de Nombre
    const trimmedFirst = formData.firstName.trim();
    if (!trimmedFirst) {
      newErrors.firstName = 'El nombre es obligatorio.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(trimmedFirst)) {
      newErrors.firstName = 'El nombre solo debe contener letras y espacios.';
    }

    // Validación de Apellido
    const trimmedLast = formData.lastName.trim();
    if (!trimmedLast) {
      newErrors.lastName = 'El apellido es obligatorio.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(trimmedLast)) {
      newErrors.lastName = 'El apellido solo debe contener letras y espacios.';
    }

    // Validación de Cédula (CC)
    const trimmedCC = formData.cc.trim();
    if (!trimmedCC) {
      newErrors.cc = 'La cédula de ciudadanía es obligatoria.';
    } else if (!/^\d+$/.test(trimmedCC)) {
      newErrors.cc = 'La cédula debe contener únicamente dígitos numéricos.';
    } else if (trimmedCC.length < 5 || trimmedCC.length > 12) {
      newErrors.cc = 'La cédula debe tener entre 5 y 12 dígitos.';
    } else if (existingCCs.includes(trimmedCC)) {
      newErrors.cc = 'Ya existe un paciente registrado con este número de cédula.';
    }

    // Validación de Teléfono (opcional)
    const trimmedPhone = formData.phone.trim();
    if (trimmedPhone) {
      const cleanPhone = trimmedPhone.replace(/[\s-]/g, '');
      if (!/^\d{7,12}$/.test(cleanPhone)) {
        newErrors.phone = 'El teléfono debe ser numérico entre 7 y 12 dígitos.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const newPatient = {
      id: 'PAT-' + Date.now(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      cc: formData.cc.trim(),
      phone: formData.phone.trim() || 'No registrado',
      registrationDate: new Date().toISOString().split('T')[0]
    };

    onAddPatient(newPatient);

    setFormData({
      firstName: '',
      lastName: '',
      cc: '',
      phone: ''
    });
    setErrors({});
    setSuccessMessage('Paciente registrado correctamente en el almacenamiento local.');

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <div className="card">
      <h2 className="card-title">Registrar Nuevo Paciente</h2>
      <p className="card-subtitle">Ingrese los datos correspondientes para el registro clínico.</p>

      {successMessage && (
        <div className="alert alert-success" role="status">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            Nombre *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={`form-input ${errors.firstName ? 'input-error' : ''}`}
            placeholder="Ejemplo: Carlos"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="field-error-message">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Apellido *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={`form-input ${errors.lastName ? 'input-error' : ''}`}
            placeholder="Ejemplo: Gómez"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="field-error-message">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="cc" className="form-label">
            Cédula de Ciudadanía (CC) *
          </label>
          <input
            id="cc"
            name="cc"
            type="text"
            inputMode="numeric"
            className={`form-input ${errors.cc ? 'input-error' : ''}`}
            placeholder="Ejemplo: 1020304050"
            value={formData.cc}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.cc && <p className="field-error-message">{errors.cc}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Teléfono <span className="form-label-optional">(Opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`form-input ${errors.phone ? 'input-error' : ''}`}
            placeholder="Ejemplo: 3001234567"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          {errors.phone && <p className="field-error-message">{errors.phone}</p>}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Guardar Paciente
        </button>
      </form>
    </div>
  );
}
