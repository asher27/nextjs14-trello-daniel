'use client';

import { cn } from '@/lib/utils';
import { ListWithCards } from '@/types';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ElementRef, useRef, useState } from 'react';
import CardForm from './card-form';
import CardItem from './card-item';
import ListHeader from './list-header';

interface ListItemProps {
    index: number;
    data: ListWithCards;
}
const ListItem = ({ index, data }: ListItemProps) => {
    const textareaRef = useRef<ElementRef<'textarea'>>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };
    const disableEditing = () => {
        setIsEditing(false);
    };

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className='shrink-0 h-full w-[272px] select-none'
                >
                    <div
                        {...provided.dragHandleProps}
                        className='w-full rounded-md bg-[#F1F2F4] shadow-md pb-2'
                    >
                        <ListHeader onAddCard={enableEditing} data={data} />
                        <Droppable droppableId={data.id} type='card'>
                            {(provided) => (
                                <ol
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={cn(
                                        'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                                        data.cards.length > 0 ? 'mt-2' : 'mt-0'
                                    )}
                                >
                                    {data.cards.map((card, index) => (
                                        <CardItem
                                            key={card.id}
                                            index={index}
                                            data={card}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm
                            ref={textareaRef}
                            listId={data.id}
                            isEditing={isEditing}
                            enableEditing={enableEditing}
                            disableEditing={disableEditing}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    );
};

export default ListItem;
