import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { thunkUpdateSong, thunkGetCurrSongs } from "../../redux/song";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSongs(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allSongs = useSelector(state => state.song)
    const currUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [errors, setError] = useState({});
    const [imageLoading, setImageLoading] = useState(false);
    const {id} = useParams()
    const currSong = allSongs[id]


    useEffect(() =>{
        dispatch(thunkGetCurrSongs())
    },[dispatch,id,currUser.id])


    // this is to populate the input with previous info
    useEffect(() =>{

        if(currSong){
            setImage(currSong.image);
            setAudio(currSong.audio);
            setTitle(currSong.title);
            setGenre(currSong.genre);
        }
    },[currSong])




    const handleSubmit = async (e) => {
      e.preventDefault();
      // creating error object to appear under inputs
      const errObj = {}
      if(!title) errObj.title = "Must enter title..."
      if(!image) errObj.image = "Image file is required..."
      if(!audio) errObj.audio = "Audio file is required..."
      if(!genre) errObj.genre = "Must select a genre..."
      setError(errObj)
      console.log("in hs", image, audio, title,genre)

      if (!Object.values(errObj).length){
      const formData = new FormData();
      formData.append("image",image);
      formData.append("audio",audio);
      formData.append("title",title);
      formData.append("genre",genre);
      // formData.append("user_id",user.id)
      console.log("inside hs",image,audio,title,genre)
      console.log("inside hs", formData)
      // aws uploads can be a bit slow—displaying
      // some sort of loading message is a good idea
        setImageLoading(true);
        console.log("inside hs", formData)
         await dispatch(thunkUpdateSong(formData,id));
         setError({})

        //after completion navigate to newly created song page
        navigate(`/songs/${id}`)
      }

    };

     if(!currSong)return null
    return (
      <div className="create-song-main-cont">
      <div className="create-song-form-cont block">
        <span>{`Update your song ${currSong.title}`}</span>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="csf-left-cont column">

          <div className='csf-img-cont column'>
              <label>New image file</label>
              <input type="file" accept="image/png, image/jpeg image/pdf, image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => setImage(e.target.files[0])} />
              <div className="error-cont">{errors.audio? errors.audio : ""}</div>
          </div>
          <div className='csf-audio-cont column'>
              <label>New audio file</label>
              <input type="file" accept="audio/mp3" onChange={(e) => setAudio(e.target.files[0])} />
              <div className="error-cont">{errors.image? errors.image : ""}</div>
          </div>

          </div>


          <div className="csf-right-cont column">

            <div className="csf-title-cont column">
              <label >Title</label>
              <input value={title} type="text" maxLength="40" onChange={(e) => setTitle(e.target.value)} />
              <div className="error-cont">{errors.title? errors.title : ""}</div>
            </div>

            <div className="csf-genre-cont column">
              <label >Tell us your genre:</label>
              <select name="genre" id="pet-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="" disabled hidden>--Pick your genre--</option>
                <option value={"Dirty Bass"}>Dirty Bass</option>
                <option value={"Hip-Hop"}>Hip-Hop</option>
                <option value={"Rock"}>Rock</option>
                <option value={"Electronic"}>Electronic</option>
                <option value={"Pop"}>Pop</option>
                <option value={"Latino"}>Latino</option>
              </select>
              <div className="error-cont">{errors.genre? errors.genre : ""}</div>
            </div>
          </div>
          <div className='submit-error-cont error-cont'>
           <button type="submit"  >Update song</button>

          </div>
          {imageLoading && <p>Loading...</p>}
        </form>
      </div>
      </div>
    );

}

export default UpdateSongs