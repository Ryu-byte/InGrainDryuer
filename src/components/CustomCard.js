import '../css/CustomCard.css'
import {useRef, useEffect} from "react";

export const CustomCard = (props) => {
    const element = useRef(null);
    const parsePos = (directionPx) => {
        return Number(directionPx.substring(0, directionPx.length - 2))
    };
    const header = document.querySelector('.header');
    const content = document.querySelector('.content');
    let isResizing = false;
    const onDragHandler = ($event) => {
        if (isResizing === false) {
            const e = element.current;
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
    useEffect(() => {
        const el = element.current;
        const resizers = document.querySelectorAll('.resizer');
        let currentResizer

        for (let resizer of resizers) {
            resizer.addEventListener('mousedown', mousedown);


            function mousedown($eventMouseDown) {
                currentResizer = $eventMouseDown.target;
                isResizing = true;
                let prevX = $eventMouseDown.clientX;
                let prevY = $eventMouseDown.clientY;
                window.addEventListener('mousemove', mousemove);
                window.addEventListener('mouseup', mouseup);

                function mousemove($event) {
                    const rect = el.getBoundingClientRect();

                    if (currentResizer.classList.contains("se")) {
                        el.style.width = rect.width - (prevX - $event.clientX) + 'px';
                        el.style.height = rect.height - (prevY - $event.clientY) + 'px';
                    } else if (currentResizer.classList.contains("sw")) {
                        el.style.width = rect.width + (prevX - $event.clientX) + 'px';
                        el.style.height = rect.height - (prevY - $event.clientY) + 'px';
                        el.style.left = rect.left - (prevX - $event.clientX) + 'px';
                    } else if (currentResizer.classList.contains("ne")) {
                        el.style.width = rect.width - (prevX - $event.clientX) + 'px';
                        el.style.height = rect.height + (prevY - $event.clientY) + 'px';
                        el.style.top = rect.top - (prevY - $event.clientY) + 'px';
                    } else if (currentResizer.classList.contains("nw")) {
                        el.style.width = rect.width + (prevX - $event.clientX) + 'px';
                        el.style.height = rect.height + (prevY - $event.clientY) + 'px';
                        el.style.top = rect.top - (prevY - $event.clientY) + 'px';
                        el.style.left = rect.left - (prevX - $event.clientX) + 'px';
                    }
                    prevX = $event.clientX;
                    prevY = $event.clientY;
                }

                function mouseup() {
                    window.removeEventListener('mousemove', mousemove);
                    window.removeEventListener('mouseup', mouseup);
                    isResizing = false;
                }
            }
        }
    })

    return (

        <div id={props.item.id} ref={element} onMouseDown={onDrag} onMouseUp={onDrop} className={'custom-card'}>
            <div className="resizer ne"></div>
            <div className="resizer nw"></div>
            <div className="resizer sw"></div>
            <div className="resizer se"></div>
            {props.item.title}
        </div>

    )
};
