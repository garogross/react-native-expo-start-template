import {useState} from "react"
import {useDispatch} from "react-redux";

export const useFormValue = (initialData,error,clearError) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialData);

    const onChange = (value,prop,isClearError) => {
        if(isClearError) {
            if(error) {
                dispatch(clearError())
            }
        } else {
            if(error?.[prop]) {
                dispatch(clearError(prop))
            }
        }

        setFormData(state => ({
            ...state,
            [prop]: value
        }))
    }
    const onPhoneChange = (value,prop) => {
        if (value.match(/[^0-9+]/g)) {
            value.replace(/[^0-9+]+/g, "");
        } else {
            onChange(value,prop)
        }
    }

    const onResetForm = () => {
        setFormData(initialData)
    }

    return {
        formData,
        onChange,
        onResetForm,
        setFormData,
        onPhoneChange,
    }
}
