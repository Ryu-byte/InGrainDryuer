import '../css/Content.css';
import {Container, Row} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import contentImg from '../img/content_img.jpg';
export const Content = () => {
  return (
      <Container fluid>
          <Row>
              <DropdownButton variant="secondary" id="dropdown-basic-button" title="Объекты" className="mr-1">
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
              <DropdownButton variant="secondary" id="dropdown-basic-button" title="Отчеты">
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
          </Row>
          <div className="content-img">
              <img
                  src={contentImg}
                  alt="Схема зерносушилки"
              />
          </div>
      </Container>
  )
};