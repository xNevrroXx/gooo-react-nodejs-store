import axios, {AxiosResponse} from "axios";
// types
import {IDadataAddressSuggestionsResponse} from "../models/IDadata";


class DadataService {
    private static base = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

    static async getSuggestion(query: string): Promise<AxiosResponse<IDadataAddressSuggestionsResponse>> {
        return axios.post<IDadataAddressSuggestionsResponse>(this.base, {query}, {
            headers: {
                "Authorization": "Token " + import.meta.env.VITE_DADATA_ADDRESS_SUGGESTION_API_KEY
            }
        })
    }
}

export default DadataService;