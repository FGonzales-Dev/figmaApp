import React, { useState } from 'react';
import { EyeSlash, Eye } from 'react-bootstrap-icons';
import './PasswordTextfield.css';

export default function PasswordTextField(props) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const className = props.className;
    const id = props.id;
    const name = props.name;
    const placeholder = props.placeholder;
    const formLabel = props.formLabel;
    const onChange = props.onChange;
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className='password-holder'>
            <h2 className='form-label'> {formLabel}</h2>
            <div className='password-input-group'>
                <input
                    id={id}
                    name={name}
                    className={className}
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={placeholder}
                    onChange={handleChange}
                />
                <button type="button" className="show-password-btn" onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                </button>
            </div>
        </div>
    );
}
