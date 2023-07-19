import { updatePresentation } from "../../store/presentations";
export default async function saveUpdatePresentation(obj, dispatch, title, presentationId,categories) {
    return await dispatch(updatePresentation({
        title: title,
        category: categories,
        slides: obj
    }, presentationId));
};