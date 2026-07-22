function SectionLabel({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "2px 2px 6px",
      font: "600 18px/1.3 var(--font-family-base)",
      color: "var(--text-primary)"
    }
  }, label);
}
window.SectionLabel = SectionLabel;
function ScreenHeader({
  title,
  subtitle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16,
      marginBottom: 8,
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 4
    }
  }, subtitle));
}
window.ScreenHeader = ScreenHeader;