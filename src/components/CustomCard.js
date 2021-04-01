import '../css/CustomCard.css'
import {useRef, useEffect} from "react";

export const CustomCard = (props) => {
    const element = useRef(null);

    useEffect(() => {
        let isResizing = false;
        const content = document.querySelector('.content');
        const e = element.current;
            e.addEventListener('mousedown', drag);
            function drag($event) {
                window.addEventListener('mousemove', mousemove);
                window.addEventListener('mouseup', mouseup);

                let prevX = $event.clientX;
                let prevY = $event.clientY;

                function mousemove($event) {
                    if (!isResizing) {
                        let newX = prevX - $event.clientX;
                        let newY = prevY - $event.clientY;
                        const rect = e.getBoundingClientRect();
                        const contentRect = content.getBoundingClientRect();
                        const left = rect.left - newX;
                        const top = rect.top - newY;
                        if ((left > contentRect.left && $event.movementX <= 0) || (left + e.offsetWidth < contentRect.right && $event.movementX >= 0)) {
                            e.style.left = `${left}px`
                        }
                        if ((top > contentRect.top && $event.movementY < 0) || (top + e.offsetHeight < contentRect.bottom && $event.movementY > 0)) {
                            e.style.top = `${top}px`
                        }
                        prevX = $event.clientX;
                        prevY = $event.clientY;
                    }
                }

                function mouseup() {
                    window.removeEventListener('mousemove', mousemove);
                    window.removeEventListener('mouseup', mouseup);
                }
            }


        const resizers = e.querySelectorAll('.resizer');
        let currentResizer;

        for (let resizer of resizers) {
            resizer.addEventListener('mousedown', resize);
            function resize($event) {
                isResizing = true;
                currentResizer = $event.target;
                let prevX = $event.clientX;
                let prevY = $event.clientY;
                window.addEventListener('mousemove', mousemove);
                window.addEventListener('mouseup', mouseup);

                function mousemove($event) {
                    const rect = e.getBoundingClientRect();

                    if (currentResizer.classList.contains("se")) {
                        e.style.width = rect.width - (prevX - $event.clientX) + 'px';
                        e.style.height = rect.height - (prevY - $event.clientY) + 'px';
                    } else if (currentResizer.classList.contains("sw")) {
                        e.style.width = rect.width + (prevX - $event.clientX) + 'px';
                        e.style.height = rect.height - (prevY - $event.clientY) + 'px';
                        e.style.left = rect.left - (prevX - $event.clientX) + 'px';
                    } else if (currentResizer.classList.contains("ne")) {
                        e.style.width = rect.width - (prevX - $event.clientX) + 'px';
                        e.style.height = rect.height + (prevY - $event.clientY) + 'px';
                        e.style.top = rect.top - (prevY - $event.clientY) + 'px';
                    } else if (currentResizer.classList.contains("nw")) {
                        e.style.width = rect.width + (prevX - $event.clientX) + 'px';
                        e.style.height = rect.height + (prevY - $event.clientY) + 'px';
                        e.style.top = rect.top - (prevY - $event.clientY) + 'px';
                        e.style.left = rect.left - (prevX - $event.clientX) + 'px';
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
    }, [])

    return (

        <div id={props.item.id} ref={element}  className={`custom-card elem-${props.item.id}`}>
            <div className='resizer ne'></div>
            <div className='resizer nw'></div>
            <div className='resizer sw'></div>
            <div className='resizer se'></div>
            <span>
                {props.item.title}
            </span>

        </div>

    )
};
