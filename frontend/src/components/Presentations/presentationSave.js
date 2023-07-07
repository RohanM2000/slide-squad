import { composePresentation } from "../../store/presentations";
export default function savePresentation(obj, dispatch, title) {
    dispatch(composePresentation({
        title: title,
        category: "temporary-filler-category",
        slides: obj
    }));
};