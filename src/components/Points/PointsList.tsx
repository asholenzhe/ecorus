import React from 'react';
import '../../pages/CollectionPoints/points.css'
import { PointsItem, PointsItemProps } from './PointsItem';

interface PointsListProps {
  points: PointsItemProps[];
  onItemClick?: (item: PointsItemProps) => void;
}

export const PointList: React.FC<PointsListProps> = ({points, onItemClick}) => (
    <ul className="points__list">
      {points.map((pt) => (
          <PointsItem
              key={pt.id}
              {...pt}
              onClick={() => onItemClick?.(pt)}  // прокидываем item
          />
      ))}
    </ul>
);
