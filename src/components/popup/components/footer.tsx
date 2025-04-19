export default function Footer() {
  return (
    <div className="ext-flex ext-flex-col ext-justify-between ext-items-center">
      <div className="ext-flex">
        <p className="ext-text-sm ext-text-muted-foreground">© 2025 DreamSub Translator</p>
      </div>
      <p className="ext-text-sm ext-text-muted-foreground">
        Version {chrome?.runtime?.getManifest().version || '1.0.0'}
      </p>
    </div>
  );
}
