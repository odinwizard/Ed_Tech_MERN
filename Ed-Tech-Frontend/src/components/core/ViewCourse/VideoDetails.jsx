import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const {courseSectionData, courseEntireData, completeLecture} = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setvideoSpecificDetails = async () => {
      if(!courseSectionData.length) return;
      if(!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data) => data._id === subSectionId
        )
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    }
    setvideoSpecificDetails()
  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  }

  const isLastVideo = () => {
     const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    } else {
      return false;
    }
  }

  const goToNextVideo = () => {
    
  }

  const goToPrevVideo = () => {

  }

  const handleLectureCompletion = () => {

  }

  return (
    <>
      <div></div>
    </>
  )
}
