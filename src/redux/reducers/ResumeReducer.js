export default function reducer(state={},action)

{
 switch (action.type) {
    case "SET_RESUME_DATA": {
      return { ...state, ...action.payload };
    }
    case "RESUME_REQUEST_TERMINATE": {
      return { ...state,...action.payload }
    }
    default: {
      return { ...state }
    }

  }
}