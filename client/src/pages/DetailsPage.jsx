import {useGet} from "@/components/hooks/useAPICall";
import {FiArrowLeft, FiTrash} from "react-icons/fi";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const DetailsPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data} = useGet(`/messages/${id}`);
  const {subject, body, date} = data;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className=" text-center">
      <div className="mx-auto w-1/2  my-4">
        <div className="flex gap-2 justify-center py-3">
          <button
            onClick={handleBack}
            className=" hover:transition-all ease-out duration-300 hover:scale-110 text-xl hover:bg-green-400 rounded-full p-2"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <button className="hover:transition-all ease-out duration-300 hover:scale-110 text-xl hover:bg-red-400 rounded-full p-2">
            <FiTrash className="w-6 h-6" />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-xl">{subject}</h3>
          <span>{date}</span>
        </div>
        <br />
        <br />
        <p>{body}</p>
      </div>
    </div>
  );
};

export default DetailsPage;
