import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Explore Data</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/states" className="hover:text-white transition-colors">States</Link></li>
              <li><Link href="/counties" className="hover:text-white transition-colors">Counties</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Programs</Link></li>
              <li><Link href="/recipients" className="hover:text-white transition-colors">Top Recipients</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/rankings" className="hover:text-white transition-colors">State Rankings</Link></li>
              <li><Link href="/trends" className="hover:text-white transition-colors">Trends</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare States</Link></li>
              <li><Link href="/downloads" className="hover:text-white transition-colors">Download Data</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Search</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Analysis</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/analysis" className="hover:text-white transition-colors">All Analysis</Link></li>
              <li><Link href="/surprising-recipients" className="hover:text-white transition-colors">Surprising Recipients</Link></li>
              <li><Link href="/covid-impact" className="hover:text-white transition-colors">Before & After COVID</Link></li>
              <li><Link href="/analysis/trade-war" className="hover:text-white transition-colors">Trade War Impact</Link></li>
              <li><Link href="/analysis/subsidy-concentration" className="hover:text-white transition-colors">Subsidy Concentration</Link></li>
              <li><Link href="/analysis/disaster-spending" className="hover:text-white transition-colors">Disaster Spending</Link></li>
              <li><Link href="/entity-types" className="hover:text-white transition-colors">Entity Types</Link></li>
              <li><Link href="/state-dependency" className="hover:text-white transition-colors">State Dependency</Link></li>
              <li><Link href="/facts" className="hover:text-white transition-colors">Farm Subsidy Facts</Link></li>
              <li><Link href="/farm-subsidies-explained" className="hover:text-white transition-colors">Subsidies Explained</Link></li>
              <li><Link href="/doge-farm-subsidies" className="hover:text-white transition-colors">DOGE & Subsidies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="hover:text-white transition-colors">All Tools</Link></li>
              <li><Link href="/program-decoder" className="hover:text-white transition-colors">Program Decoder</Link></li>
              <li><Link href="/tools/calculator" className="hover:text-white transition-colors">Subsidy Calculator</Link></li>
              <li><Link href="/tools/subsidy-quiz" className="hover:text-white transition-colors">Subsidy Quiz</Link></li>
              <li><Link href="/farm-bill" className="hover:text-white transition-colors">Farm Bill Guide</Link></li>
              <li><Link href="/crop-insurance" className="hover:text-white transition-colors">Crop Insurance Guide</Link></li>
              <li><Link href="/glossary" className="hover:text-white transition-colors">Glossary</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Sister Sites</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.openmedicaid.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenMedicaid</a></li>
              <li><a href="https://www.openmedicare.us" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenMedicare</a></li>
              <li><a href="https://www.openfeds.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenFeds</a></li>
              <li><a href="https://www.openspending.us" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenSpending</a></li>
              <li><a href="https://www.openlobby.us" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenLobby</a></li>
              <li><a href="https://www.openimmigration.us" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenImmigration</a></li>
              <li><a href="https://www.vaccinewatch.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">VaccineWatch</a></li>
              <li><a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TheDataProject.ai</a></li>
            </ul>
            <h3 className="text-white font-semibold mb-3 mt-6 text-sm uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://x.com/thedataproject0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Follow on X</a></li>
              <li><a href="mailto:info@thedataproject.ai" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="https://github.com/kianbob/opensubsidies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-500">
          <p>Data from USDA Farm Service Agency payment files. Open data, no paywalls.</p>
          <p className="mt-1">A <a href="https://thedataproject.ai" className="hover:text-white">TheDataProject.ai</a> platform. © {new Date().getFullYear()} OpenSubsidies.</p>
        </div>
      </div>
    </footer>
  )
}
