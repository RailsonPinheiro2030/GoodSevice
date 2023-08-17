import { Input, InputGroup, Whisper, Tooltip } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const InputSearch = () =>{
    return(
        <InputGroup inside style={{maxWidth: 250, maxHeight: 50}}>
            <InputGroup.Addon>
                <SearchIcon style={{color: 'blue'}}/>
            </InputGroup.Addon>
            <Input/>
        </InputGroup>
    )
}
export default InputSearch


