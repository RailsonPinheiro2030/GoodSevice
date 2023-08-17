import './styles.css'
import { Cards, DropdownFilter, InputSearch} from '../../components'
const HomeScreen = () =>{
    

    return(
        <>
        <div className='container-home'> 
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 10, padding: 5, borderRadius: 5, maxHeight: 100}}>
                <InputSearch/><DropdownFilter/>
            </div>
            <Cards/>
        </div>
        </>
    )
}
export default HomeScreen