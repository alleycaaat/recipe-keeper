import React, { useState } from 'react';
import '../style.css';
import { GoTrashcan } from 'react-icons/go';

const Saved = ({ list, cat, handlecats, handleremove }) => {
    const [results, setResults] = useState([...list]);
    const [search, setSearch] = useState();
    const [disp, setDisp] = useState([]);
    const [cats, setCats] = useState([...cat]);

    const handleSearch = (e) => {
        let sea = e.target.value;
        setSearch(sea);
        if (sea === cat[0]) {
            setDisp([]);
        } else if (sea === cat[1]) {
            setDisp(results);
        } else {
            const filt = results.filter((title) => {
                return title.cat.includes(sea);
            });
            setSearch(sea);
            setDisp(filt);
        }
    };

    const viewAll = () => {
        setDisp(results);
        setSearch('view all');
    };

    const remove = (idx, kitty, title) => {
        const newList = [...list];
        const newCats = [...cat];
        var searchTerm = [search];
        var catIdx = cat.indexOf(kitty); //get index of category from category array
        let index = list.findIndex((o) => o.name === title); //get index of recipe name from entries array
        let results = newList.filter((o) => {
            //returns list of items in category
            return o.cat.includes(kitty);
        });
        //if viewing all recipes, remove selected item
        if (searchTerm === 'view all') {
            newList.splice(idx, 1);
            setDisp(newList);
            setResults(newList);
            handleremove(newList);
            //if it's the only item in its category, remove the category from the list
            if (results.length <= 1) {
                newCats.splice(catIdx, 1);
                setCats(newCats);
                handlecats(newCats);
            }
            //if looking at a category, remove selected item
        } else {
            newList.splice(index, 1);
            results.splice(idx, 1);
            setResults(newList);
            handleremove(newList);
            //if it's the only item in its category, remove the category from the list
            if (results.length < 1) {
                newCats.splice(catIdx, 1);
                setDisp([]);
                setCats(newCats);
                handlecats(newCats);
                //otherwise just update the display
            } else {
                setDisp(results);
            }
        }
    };

    return (
        <div className='editor'>
            <div className='header'>
                <h1>Categories</h1>
                <label for='categories' hidden>
                    Categories:
                </label>
            </div>
            <div className='blue'>
                <div className='ddown'>
                    <select
                        name='categories'
                        id='categories'
                        onChange={handleSearch}
                    >
                        {cats.map((kitten, index) => (
                            <option
                                index={index}
                                category={kitten}
                                value={kitten}
                            >
                                {search === 'select a category'
                                    ? 'select a category'
                                    : kitten}
                            </option>
                        ))}
                    </select>
                    <button id='viewAll' onClick={viewAll} className='viewall'>
                        View All
                    </button>
                </div>
                <div className='entrylist'>
                    {disp.map((title, index) => (
                        <span className='span'>
                            <a
                                href={title.link}
                                value={title.name}
                                index={index}
                                category={title.cat}
                            >
                                {title.name}
                            </a>
                            <button
                                id='close'
                                onClick={() => {
                                    remove(index, title.cat, title.name);
                                }}
                                className='x'
                            >
                                <GoTrashcan className='icon trash' />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Saved;
