import { composePresentation } from "../../store/presentations";
export default async function savePresentation(obj, dispatch, title,categories) {
    const res = await dispatch(composePresentation({
        title: title,
        category: categories,
        slides: obj
    }));
    return res;
};