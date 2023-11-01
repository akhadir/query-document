import axios from 'axios';
import HfInference from '@huggingface/inference';

export const getImageQuery = async (question: string, billURL: string) => {
    const hf = new HfInference.HfInference('');
    const resp = await hf.documentQuestionAnswering({
        model: 'impira/layoutlm-document-qa',
        inputs: {
            question,
            image: (await axios.get(billURL)).data.blob(),
        },
    });
    console.log('Resp: ', resp);
    return resp;
};

export default { getImageRes: getImageQuery };
