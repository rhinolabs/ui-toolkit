"use client";

import { Github } from "lucide-react";

export function CustomFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="nx-bg-neutral-900 nx-text-gray-400 print:nx-bg-transparent">
      <div className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-flex-col nx-items-center nx-justify-between nx-gap-8 nx-py-12 nx-px-8 md:nx-flex-row">
        <div className="nx-flex nx-flex-col nx-items-center nx-gap-2 md:nx-items-start">
          <p className="nx-text-sm">
            © {currentYear} Rhinolabs Agency. All rights reserved.
          </p>
          <p className="nx-text-xs nx-max-w-md">
            Licensed under the MIT License.
            <br />
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files, to deal
            in the Software without restriction.
          </p>
        </div>
        
        <div className="nx-flex nx-flex-col nx-items-center nx-gap-2 md:nx-items-end">
          <a
            href="https://github.com/rhinolabs/ui-toolkit"
            target="_blank"
            rel="noreferrer"
            className="nx-flex nx-items-center nx-gap-1 nx-text-sm nx-text-gray-400 hover:nx-text-gray-100"
          >
            <Github size={16} className="nx-mr-1" />
            Contribute on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
