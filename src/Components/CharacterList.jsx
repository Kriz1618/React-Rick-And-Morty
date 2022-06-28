import { useState, useEffect } from "react";
import { Character } from "./Character";

function NavPage({ page, setPage }) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <p>Page: {page}</p>

      <div className="btn-toolbar">
        {
          (page > 1) && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setPage(page - 1)}
            >
              Page {page - 1}
            </button>            
          )
        }
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setPage(page + 1)}
        >
          Page {page + 1}
        </button>        
      </div>
    </header>
  );
}

export function CharacterList() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const currentPage = localStorage.getItem('page');
    console.log('26', 'currentPage', currentPage);
    if (currentPage) {
      setPage(Number(currentPage));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const { results } = await data.json();
      setCharacters(results);
      setLoading(false);
      localStorage.setItem('page', page);
    }
    fetchData();

  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character
                key={character.id}
                name={character.name}
                origin={character.origin}
                image={character.image}
              />
            </div>
          ))}
        </div>
      )}

      <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default CharacterList;
