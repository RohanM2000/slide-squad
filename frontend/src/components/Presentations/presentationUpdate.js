import { updatePresentation } from "../../store/presentations";
export default async function saveUpdatePresentation(obj, dispatch, title, presentationId,categories) {
    const res = await dispatch(updatePresentation({
        title: title,
        category: categories,
        slides: obj
    }, presentationId));
    // console.log(res);
    return res;
};