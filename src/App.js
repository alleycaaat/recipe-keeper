import './style.css';
import React, { useState, useEffect } from 'react';
import New from './components/New';
import Home from './components/Home';
import Saved from './components/Saved';
import api from './api';
import Loading from './components/loading';

const App = () => {
    const [active, setActive] = useState('Home');
    const [loading, setLoading] = useState(true);
    const [entry, setEntry] = useState([]);
    const [cats, setCats] = useState([]);

    const startUp = () => {
        api.readall().then((recipes) => {
            let catList = ['select a category', 'view all'];
            recipes.map((kitty) => {
                if (!catList.includes(kitty.data.cat)) {
                    catList.push(kitty.data.cat);
                }
                return catList;
            });

            let newList = [];
            recipes.map((rec) => {
                const key = getId(rec);
                newList.push({
                    data: {
                        name: rec.data.name,
                        link: rec.data.link,
                        cat: rec.data.cat,
                        id: key,
                    },
                });
                return newList;
            });
            setCats(catList);
            setEntry(newList);
            setLoading(false);
        });
    };

    useEffect(() => {
        startUp();
    }, []);

    const listCats = (kitty) => {
        let newcats = [];
        if (!cats.includes(kitty.data.cat)) {
            newcats.push(kitty.data.cat);
        }
        setCats(newcats);
    };

    const handlerem = async (title) => {
        let id = title.data.id;

        await api
            .erase(id)
            .then((res) => {
                console.log(res);
                startUp();
            })
            .catch((err) => {
                console.log('API error', err);
            });
    };

    const addRec = async (input) => {
        await api
            .create(input)
            .then((res) => {
                console.log(res);
                startUp();
            })
            .catch((err) => {
                console.log('API error', err);
            });
    };

    return (
        <div className='wrapper'>
            <div className='tabs'>
                <button
                    className={
                        'tab' + (active === 'Home' ? ' active' : ' inactive')
                    }
                    onClick={() => setActive('Home')}
                >
                    Home
                </button>
                <button
                    className={
                        'tab' + (active === 'Saved' ? ' active' : ' inactive')
                    }
                    onClick={() => setActive('Saved')}
                >
                    Saved
                </button>
                <button
                    className={
                        'tab' + (active === 'New' ? ' active' : ' inactive')
                    }
                    onClick={() => setActive('New')}
                >
                    New
                </button>
            </div>
            <div className='notepad'>
                {loading && <Loading />}
                {active === 'New' && (
                    <New addRec={addRec} setLoading={setLoading} />
                )}
                {active === 'Home' && <Home />}
                {active === 'Saved' && (
                    <Saved
                        list={entry}
                        cat={cats}
                        listCats={listCats}
                        setLoading={setLoading}
                        handlerem={handlerem}
                    />
                )}
            </div>
            {active === 'Home' && (
                <div class='credit'>
                    <p>
                        See my portfolio at{' '}
                        <a
                            href='https://achulslander.com/'
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            AC Hulslander
                        </a>
                    </p>
                    <p>
                        <a
                            href='https://codepen.io/alleycaaat/pens/public'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            See my other pens
                        </a>
                    </p>
                    <p>
                        <a
                            href='https://github.com/alleycaaat/recipe-keeper'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            See this project on GitHub
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

function getId(rec) {
    //if note doesn't have a ref
    if (rec.ref === undefined) {
        console.log('ID not retrieved');
        return null;
    }
    //otherwise, return the id
    return rec.ref['@ref'].id;
}

export default App;
