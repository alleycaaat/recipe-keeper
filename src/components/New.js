import React from 'react';
import { useState } from 'react';
import '../style.css';
import { GoPencil } from 'react-icons/go'

const New = ({ updateentry, updatecats }) => {
    const [input, setInput] = useState({
        link: '',
        name: '',
        cat: '',
    });
    const { link, name, cat } = input;
    const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
            link: '',
            name: '',
            cat: '',
        });
    };

    const submit = () => {
        input.cat = input.cat.toLowerCase();
        if (input.cat === '') {
            input.cat = 'uncategorized';
        }
        updateentry(input);
        updatecats(input.cat);
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInput({ ...input, [name]: value });
    };

    return (
        <div className='editor'>
            <div className='header'>
                <h1>Add a new recipe</h1>
            </div>
            <div className='blue'>
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <span className='ins'>
                            <input
                                type='url'
                                name='link'
                                value={link}
                                onChange={handleChange}
                                placeholder='insert recipe url'
                                required
                            />
                            <GoPencil className='icon' />
                        </span>
                        <span className='ins'>
                            <input
                                type='text'
                                name='name'
                                value={name}
                                onChange={handleChange}
                                placeholder='insert recipe title'
                                required
                            />
                            <GoPencil className='icon' />
                        </span>
                        <span className='ins'>
                            <input
                                type='text'
                                name='cat'
                                value={cat}
                                onChange={handleChange}
                                placeholder='recipe category'
                            />
                            <GoPencil className='icon' />
                        </span>
                    </div>
                    <button
                        type='submit'
                        onClick={submit}
                        className='buttons submit'
                    >
                        Save to Recipe Box
                    </button>
                </form>
            </div>
        </div>
    );
};

export default New;
