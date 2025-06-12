import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesApi";

export const CourseDetails = () => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseId = useParams();

  const handleBuyCourse = async () => {
    if(token) {
      buyCourse(token, {courseId}, user, navigate, dispatch);
      return;
    }
  }


  return (
    <div className='text-white'>
           <button className="bg-yellow-200 p-3"
           onClick={() => handleBuyCourse()}
           >
             Buy Now
           </button>
    </div>
  )
}
