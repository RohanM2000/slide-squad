import { updatePresentation } from "../../store/presentations";
export default function saveUpdatePresentation(obj, dispatch, title, presentationId) {
    dispatch(updatePresentation({
        title: title,
        category: "temporary-filler-category",
        slides: obj
    }, presentationId));
};