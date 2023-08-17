import React, { useState, useEffect } from 'react';
import { Panel, Rate, Placeholder } from 'rsuite';
import DrawerComponent from '../drawer';
import { getItems } from "../../utils/api";
import './styles.css';

const Cards = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setLoader(false);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const openDrawer = (item) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className='container-cards'>
      {items.map((item, index) => (
        <Panel
          key={index}
          shaded
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: '15px',
            cursor: 'pointer',
          }}
          onClick={() => openDrawer(item)}
        >
          {loader ? (
            <Placeholder.Paragraph rows={5} graph="image" active />
          ) : (
            <div className='content'>
              <img src={item?.image} alt="Imagem"  loading="lazy"/>
              <div>
                <ul className='list-top'>
                  <li>
                    <span>{item?.name}</span>
                    <Rate
                      defaultValue={item?.stars}
                      style={{ marginLeft: 10, zIndex: -0 }}
                      size='xs'
                    />
                  </li>
                  <li>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span>{item?.professional}</span>
                  </li>
                </ul>
                <ul className='list-content'>
                  <li>
                    <div>
                      <i className="fa fa-money" aria-hidden="true"></i>
                    </div>
                    <div>
                      <strong>Price</strong>
                      <span>{item?.price}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                    </div>
                    <div>
                      <strong>Duration</strong>
                      <span>{item?.duration}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
                    </div>
                    <div>
                      <strong>Availability</strong>
                      <span>{item?.availability}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </Panel>
      ))}
      <DrawerComponent open={open} setOpen={setOpen} data={selected} />
    </div>
  );
};

export default Cards;
