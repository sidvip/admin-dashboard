export default function Tag({ value, type, className }) {

    const colorMap = {
        primary: '#00B493',
        secondary: '#F9AD50',
        danger: '#F05362',
        info: '#0D83C8',
        extra: '#0D83C8'
    };

    return (
        <span style={{ backgroundColor: colorMap[type], padding: '4px 6px 4px 6px', borderRadius: 5, fontSize: 10, fontWeight: 'semi-bold', color: 'white' }} className={className}>{value}</span>
    )
}