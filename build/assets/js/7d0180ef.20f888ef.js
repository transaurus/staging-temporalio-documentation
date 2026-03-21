"use strict";(self.webpackChunktemporal_documentation=self.webpackChunktemporal_documentation||[]).push([["54799"],{42853(e,r,t){t.r(r),t.d(r,{metadata:()=>a,default:()=>u,frontMatter:()=>s,contentTitle:()=>n,toc:()=>l,assets:()=>c});var a=JSON.parse('{"id":"security","title":"Temporal Platform security","description":"Discover general security practices of Temporal Technologies, SaaS security with Temporal Cloud, and how to self-host a secure Temporal Platform on our security pages.","source":"@site/docs/security.mdx","sourceDirName":".","slug":"/security","permalink":"/security","draft":false,"unlisted":false,"editUrl":"https://github.com/temporalio/documentation/edit/main/docs/docs/security.mdx","tags":[{"inline":true,"label":"Security","permalink":"/tags/security"}],"version":"current","frontMatter":{"id":"security","title":"Temporal Platform security","sidebar_label":"Security","description":"Discover general security practices of Temporal Technologies, SaaS security with Temporal Cloud, and how to self-host a secure Temporal Platform on our security pages.","slug":"/security","toc_max_heading_level":4,"keywords":["security"],"tags":["Security"]},"sidebar":"documentation","previous":{"title":"Support","permalink":"/cloud/support"},"next":{"title":"Use cases","permalink":"/evaluate/use-cases-design-patterns"}}'),i=t(74848),o=t(28453);let s={id:"security",title:"Temporal Platform security",sidebar_label:"Security",description:"Discover general security practices of Temporal Technologies, SaaS security with Temporal Cloud, and how to self-host a secure Temporal Platform on our security pages.",slug:"/security",toc_max_heading_level:4,keywords:["security"],tags:["Security"]},n,c={},l=[];function d(e){let r={p:"p",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.p,{children:"Find security information for your Temporal deployment, whether you're using Temporal Cloud or self-hosting."}),"\n",(0,i.jsxs)("div",{className:"pattern-grid",children:[(0,i.jsx)("a",{href:"https://trust.temporal.io",className:"pattern-card",children:(0,i.jsxs)("div",{className:"pattern-content",children:[(0,i.jsx)("h3",{children:"Company Security"}),(0,i.jsx)("p",{children:"Learn about Temporal Technologies' general security practices, compliance certifications, and organizational security measures."})]})}),(0,i.jsx)("a",{href:"/cloud/security",className:"pattern-card",children:(0,i.jsxs)("div",{className:"pattern-content",children:[(0,i.jsx)("h3",{children:"Temporal Cloud Security"}),(0,i.jsx)("p",{children:"Explore the security features of our SaaS offering, including mTLS, end-to-end encryption, and enterprise compliance."})]})}),(0,i.jsx)("a",{href:"/self-hosted-guide/security",className:"pattern-card",children:(0,i.jsxs)("div",{className:"pattern-content",children:[(0,i.jsx)("h3",{children:"Self-Hosted Security"}),(0,i.jsx)("p",{children:"Discover how to deploy and secure your own Temporal Platform infrastructure with production-ready best practices."})]})}),(0,i.jsx)("a",{href:"https://temporal.io/pages/cloud-security-white-paper",className:"pattern-card",children:(0,i.jsxs)("div",{className:"pattern-content",children:[(0,i.jsx)("h3",{children:"Temporal Cloud Security Whitepaper"}),(0,i.jsx)("p",{children:"Learn how Temporal Cloud provides provable security by design - orchestrating encrypted workflows without ever accessing your sensitive data."})]})})]}),"\n",(0,i.jsx)("style",{jsx:!0,children:`
.security-cards-container {
  margin: 2rem 0;
}

.security-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.security-card {
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.security-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #444ce7 0%, #b664ff 100%);
}

.security-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(68, 76, 231, 0.12);
  border-color: #444ce7;
}

.security-card-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.375rem;
  font-weight: 600;
  color: #1a1b23;
  line-height: 1.3;
}

.security-card-divider {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #444ce7 0%, #b664ff 100%);
  border-radius: 2px;
  margin-bottom: 1.5rem;
}

.security-card-body p {
  color: #5d6b7d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.security-card-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #444ce7;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  padding: 0.5rem 0;
}

.security-card-button:hover {
  color: #3730a3;
  text-decoration: none;
  transform: translateX(2px);
}

.security-card-button svg {
  transition: transform 0.2s ease;
}

.security-card-button:hover svg {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .security-cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .security-card {
    padding: 1.5rem;
  }
}
`})]})}function u(e={}){let{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453(e,r,t){t.d(r,{R:()=>s,x:()=>n});var a=t(96540);let i={},o=a.createContext(i);function s(e){let r=a.useContext(o);return a.useMemo(function(){return"function"==typeof e?e(r):{...r,...e}},[r,e])}function n(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(o.Provider,{value:r},e.children)}}}]);