import { composePresentation } from "../../store/presentations";
export default function savePresentation(obj, dispatch) {
    dispatch(composePresentation({
        title: "temporary-filler-title",
        category: "temporary-filler-category",
        slides: obj
    }));
};