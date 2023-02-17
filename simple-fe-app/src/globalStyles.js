import GlobalStyles from '@mui/material/GlobalStyles';

const styles = (theme) => ({
    root: {
        fontSize: '14px',

        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        },
    },
    ul: {
        paddingLeft: 0,
    },
    li: {
        listStyle: 'none',
    },
    a: {
        textDecoration: 'none',
        color: 'white',
    },
});

export default () => {
    return <GlobalStyles styles={styles} />;
};
