export default function ImgComponent() {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + '/kon.png'}
        alt="Kon"
        style={{ width: '7%', height: 'auto' }}
      />
    </div>
  );
}