import { updatePresentation } from "../../store/presentations";
export default function saveUpdatePresentation(obj, dispatch, title, presentationId,categories) {
    dispatch(updatePresentation({
        title: title,
        category: categories,
        slides: obj
    }, presentationId));
};