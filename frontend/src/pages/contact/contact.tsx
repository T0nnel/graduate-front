import React, { useState } from 'react';
import './contact.css';
import { Navigate } from '../../components/navigate/navigate';
import { Footer } from '../../components/footer/footer';

export const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [success] = useState<string | null>(null);


    return (
        <>
            <Navigate />
            <div className="contact-us">
                <h1>Contact Us</h1>
                <form >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                            className={errors.message ? 'error' : ''}
                        />
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>

                    <button className='contact1' type="submit">Send Message</button>
                </form>
                {success && <p className="success-message">{success}</p>}
            </div>
            <Footer/>
        </>
    );
};
