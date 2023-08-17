import { Dropdown, IconButton } from 'rsuite';
import SettingHorizontalIcon from '@rsuite/icons/SettingHorizontal';
import './styles.css'


const renderIconButton = (props, ref) => {
    return (
      <IconButton {...props} ref={ref} icon={<SettingHorizontalIcon/>}  appearance="primary" />
    );
}; 


const DropdownFilter = () =>{
    return(
        <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            
        </Dropdown>
    )   
}
export default DropdownFilter