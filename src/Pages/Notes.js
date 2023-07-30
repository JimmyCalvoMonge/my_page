import NotesList from './NotesList';

const Notes = () => {
    const data=require('../data/NotesDescriptions.json');
    return (
        <div className="List">
            {data && <NotesList blogs={data} title="Course Notes ..."/>}
        </div>
      );
}
export default Notes;