import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import './singleImage.css';
import { Typography } from '@material-ui/core';
export default function SingleImage({ name, description, src }) {
    return (
            <Card>
                <CardContent>
                    <CardHeader>{name}</CardHeader>
                    <Typography variant="subheading">{description}</Typography>
                    <CardMedia image={src} className="Single"></CardMedia>
                </CardContent>
            </Card>
    );
}