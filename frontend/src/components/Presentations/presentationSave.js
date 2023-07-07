import { composePresentation } from "../../store/presentations";
export default async function savePresentation(obj, dispatch, title) {
    const res = await dispatch(composePresentation({
        title: title,
        category: "temporary-filler-category",
        slides: obj
    }));
    return res;
};