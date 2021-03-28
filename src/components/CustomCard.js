import '../css/CustomCard.css'
import { useRef } from "react";

export const CustomCard = (props) => {
    const element = useRef(null);

    const onDragHandler = ($event) => {
        const e = element.current;
        const parsePos = (directionPx) => {
            return Number(directionPx.substring(0, directionPx.length - 2))
        };
        const header = document.querySelector('.header');
        const content = document.querySelector('.content');
        const eLeft = parsePos(e.style.left);
        const eTop = parsePos(e.style.top) - header.offsetHeight;
        const contentWidth = content.offsetWidth;
        const contentHeight = content.offsetHeight;
        const currentElementLeft = $event.pageX - e.offsetWidth / 2;
        const currentElementTop = $event.pageY - e.offsetHeight / 2;
        const mousePos = {
            x: {
                right: $event.pageX + (e.offsetWidth / 2),
                left: $event.pageX - (e.offsetWidth / 2),
            },
            y: {
                top: $event.pageY - (e.offsetHeight / 2) - header.offsetHeight,
                bottom: $event.pageY + (e.offsetHeight / 2) - header.offsetHeight,
            },
        }
        if ((((eLeft + e.offsetWidth) < contentWidth && $event.movementX > 0)
            || (eLeft >= 1 && $event.movementX < 0)) && (mousePos.x.left > 1 && mousePos.x.right < contentWidth - 1)) {
            e.style.left = currentElementLeft + 'px';
        }
        if ((((eTop + e.offsetHeight) < contentHeight && $event.movementY > 0)
            || (eTop >= 1 && $event.movementY < 0)) && (mousePos.y.top > 1 && mousePos.y.bottom < contentHeight - 1)) {
            e.style.top = currentElementTop + 'px'
        }
    }

    const onDrag = () => {
        window.addEventListener('mousemove', onDragHandler)
        document.addEventListener('mouseleave', () => {
            onDrop();
        })
    };

    const onDrop = () => {
        window.removeEventListener('mousemove', onDragHandler);
    };

    return (
        <div id={props.item.id} ref={element} onMouseDown={onDrag} onMouseUp={onDrop} className={'custom-card'}>
            { props.item.title }
        </div>
    )
};
