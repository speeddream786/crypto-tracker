
import  {VscError} from 'react-icons/vsc'
const ErrorComponent=()=>{
    return(
        <div className="err">
            <div>
                <VscError size={"100"} color={"red"} ></VscError>
                <p>OOps server is not responding. please try later &#128542;</p>
            </div>
        </div>
    )
}
export default ErrorComponent