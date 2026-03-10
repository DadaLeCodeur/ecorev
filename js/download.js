// ════════════════════════════════════════════════════════
// DOWNLOAD BAR + PDF + DOCX EXPORT
// ════════════════════════════════════════════════════════

// ── COMPTE section ──
function buildCompteSec() {
  document.getElementById('chs-compte').innerHTML = `<div id="chs-compte-inner"></div>`;
}

// ════════════════════════════════════════════════════════
// DOWNLOAD BAR
// ════════════════════════════════════════════════════════
function downloadBar(title) {
  return `<div class="download-bar">
    <p>📥 <strong>Télécharger ce chapitre</strong><br><span style="font-size:12px;color:var(--muted)">${title}</span></p>
    <div class="dl-btns">
      <button class="dl-btn" id="dl-pdf-btn" onclick="downloadPDF()">📄 PDF</button>
      <button class="dl-btn docx" id="dl-docx-btn" onclick="downloadDOCX()">📝 Word (.docx)</button>
    </div>
  </div>`;
}

// ── Build structured chapter data for export ──
function getChapterExportData() {
  const ch = CHAPTERS.find(c => c.id === currentChapter);
  if (!ch) return null;

  const sections = [
    {
      title: '1. Les 6 secteurs institutionnels',
      content: [
        'Sociétés Financières (SF) — Ressources : intérêts & commissions. Banques, assurances, mutuelles.',
        'Sociétés Non Financières (SNF) — Ressources : profit. VA = Production − CI.',
        'Administrations Publiques (APU) — Ressources : impôts et taxes. APUC, APUL, ASSO.',
        'ISBLSM — Ressources : cotisations volontaires + subventions. Associations, syndicats.',
        'Ménages — Ressources : revenus d\'activité + propriété. Consomment, épargnent.',
        'Reste du Monde (RDM) — Décrit les relations résidents / non-résidents.',
      ]
    },
    {
      title: '2. Formules clés',
      content: [
        'Revenu disponible = Revenus primaires − Impôts/cotisations + Prestations sociales',
        'Revenu arbitrable = Revenu disponible − Dépenses pré-engagées',
        'Épargne brute = Revenu disponible brut − Dépenses de consommation',
        'Taux d\'épargne = (Épargne brute / RDB) × 100',
        'Valeur Ajoutée = Production − Consommations intermédiaires',
        'Taux PO = (Impôts + Taxes + Cotisations) / PIB × 100',
        'Équilibre E-R (ouvert) : PIB + M = CF + CI + FBCF + X + ΔStocks',
        'Épargne = Investissement (fermée) : S = I',
        'Épargne = Investissement (ouverte) : S = I + (X − M)',
      ]
    },
    {
      title: '3. Théoriciens principaux',
      content: [
        'Keynes (1883-1946) — La consommation dépend du revenu disponible actuel (PMC). Épargne = résidu. S=I ex post via le multiplicateur.',
        'Friedman (1912-2006) — Théorie du revenu permanent : conso dépend du revenu futur anticipé, pas du revenu courant.',
        'Modigliani (1918-2003) — Théorie du cycle de vie : on emprunte jeune, épargne à l\'âge actif, désépargne à la retraite.',
        'Duesenberry (1918-2009) — Consommation ostentatoire et effet de cliquet : les habitudes de conso baissent lentement.',
        'Musgrave (1910-2007) — 3 fonctions de l\'État : Allocation, Redistribution, Régulation.',
        'Laffer (contemporain) — Courbe de Laffer : « Trop d\'impôts tue l\'impôt ».',
        'Engel (1821-1896) — Loi d\'Engel : plus le revenu ↑, plus la part alimentaire dans le budget ↓.',
      ]
    },
    {
      title: '4. Monnaie',
      content: [
        '3 fonctions : numération (unité de compte), intermédiation (paiement), réserve de valeur.',
        '3 formes : divisionnaire (pièces / Trésor), fiduciaire (billets / BCE), scripturale (comptes / banques commerciales).',
        'Création monétaire : « Les crédits font les dépôts » — les banques créent de la monnaie en accordant des crédits.',
        'Désintermédiation : 80% de financement bancaire (1980) → moins de 40% aujourd\'hui.',
        'Cryptoactifs ≠ monnaie : pas de cours légal, forte volatilité, acceptation limitée.',
        'Blockchain = registre décentralisé validé par les mineurs.',
      ]
    },
    {
      title: '5. Le circuit économique',
      content: [
        'Représentation simplifiée des flux entre agents sur les marchés.',
        'Flux réels (B&S, travail) et flux monétaires (salaires, paiements, impôts).',
        '3 marchés : biens & services, travail, capitaux.',
        'Flux unilatéraux : sans contrepartie (services gratuits de l\'État, dons).',
        'Tableau de Quesnay (1758) = premier circuit économique connu.',
        'TES = opérations sur produits. TOF = opérations financières.',
      ]
    },
    {
      title: '6. Équilibres macroéconomiques',
      content: [
        'Équilibre emplois-ressources (ouvert) : PIB + M = CF + CI + FBCF + X + ΔStocks.',
        'S = I (économie fermée).',
        'S = I + (X − M) (économie ouverte).',
        'Keynésiens : égalité S=I ex post via le multiplicateur.',
        'Néoclassiques : égalité S=I ex ante via le taux d\'intérêt.',
      ]
    },
  ];
  return { ch, sections };
}

// ── PDF DOWNLOAD (jsPDF) ──
function downloadPDF() {
  const data = getChapterExportData();
  if (!data) return;
  const { ch, sections } = data;
  const btn = document.getElementById('dl-pdf-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Génération…'; }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, margin = 18, contentW = W - margin * 2;
    let y = 20;

    const checkPage = (needed = 10) => {
      if (y + needed > 280) { doc.addPage(); y = 20; }
    };

    // Header band
    doc.setFillColor(30, 36, 60);
    doc.rect(0, 0, W, 36, 'F');
    doc.setTextColor(91, 141, 238);
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('ÉCOREV — FICHE DE RÉVISION', margin, 12);
    doc.setTextColor(232, 234, 246);
    doc.setFontSize(15); doc.setFont('helvetica', 'bold');
    doc.text(ch.num + ' — ' + ch.title, margin, 23, { maxWidth: contentW });
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 116, 148);
    doc.text(ch.subtitle, margin, 32);
    y = 46;

    sections.forEach(sec => {
      checkPage(16);

      // Section title bar
      doc.setFillColor(20, 24, 40);
      doc.roundedRect(margin - 2, y - 5, contentW + 4, 10, 2, 2, 'F');
      doc.setDrawColor(91, 141, 238);
      doc.setLineWidth(0.4);
      doc.line(margin, y - 5, margin, y + 5);
      doc.setTextColor(91, 141, 238);
      doc.setFontSize(10); doc.setFont('helvetica', 'bold');
      doc.text(sec.title, margin + 4, y + 1);
      y += 10;

      sec.content.forEach(line => {
        checkPage(8);
        // bullet
        doc.setFillColor(91, 141, 238);
        doc.circle(margin + 1.5, y - 1, 0.9, 'F');
        doc.setTextColor(200, 205, 230);
        doc.setFontSize(9); doc.setFont('helvetica', 'normal');
        const wrapped = doc.splitTextToSize(line, contentW - 8);
        doc.text(wrapped, margin + 5, y);
        y += wrapped.length * 5 + 1.5;
      });
      y += 4;
    });

    // Footer on each page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setDrawColor(40, 48, 72);
      doc.setLineWidth(0.3);
      doc.line(margin, 288, W - margin, 288);
      doc.setFontSize(8); doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 116, 148);
      doc.text('ÉcoRev — ' + ch.num, margin, 293);
      doc.text(`Page ${i} / ${pageCount}`, W - margin, 293, { align: 'right' });
      doc.setTextColor(91, 141, 238);
      doc.text('ecorev', W / 2, 293, { align: 'center' });
    }

    const fname = `EcoRev_${ch.num}_${ch.title.slice(0,30).replace(/\s+/g,'_')}.pdf`;
    doc.save(fname);
  } catch(e) {
    console.error(e);
    alert('Erreur lors de la génération PDF. Essaie depuis un autre navigateur.');
  }

  if (btn) { btn.disabled = false; btn.innerHTML = '📄 PDF'; }
}

// ── DOCX DOWNLOAD (docx.js) ──
async function downloadDOCX() {
  const data = getChapterExportData();
  if (!data) return;
  const { ch, sections } = data;
  const btn = document.getElementById('dl-docx-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Génération…'; }

  try {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = docx;

    const children = [];

    // Title
    children.push(new Paragraph({
      text: 'ÉcoRev — ' + ch.num,
      heading: HeadingLevel.TITLE,
      spacing: { after: 100 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: ch.title, bold: true, size: 28, color: '5b8dee' })],
      spacing: { after: 80 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: ch.subtitle, color: '6b7494', size: 20, italics: true })],
      spacing: { after: 300 },
    }));

    sections.forEach(sec => {
      // Section heading
      children.push(new Paragraph({
        text: sec.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 100 },
        border: {
          bottom: { color: '5b8dee', style: BorderStyle.SINGLE, size: 4, space: 4 }
        }
      }));

      sec.content.forEach(line => {
        children.push(new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: line, size: 20, color: '374151' })
          ],
          spacing: { after: 60 },
        }));
      });
    });

    // Footer note
    children.push(new Paragraph({ spacing: { before: 400 } }));
    children.push(new Paragraph({
      children: [new TextRun({ text: 'Généré par ÉcoRev • Fiche de révision économie', size: 16, color: '9ca3af', italics: true })],
      alignment: AlignmentType.CENTER,
    }));

    const doc2 = new Document({
      creator: 'ÉcoRev',
      title: ch.num + ' — ' + ch.title,
      description: ch.subtitle,
      sections: [{ children }],
    });

    const buffer = await Packer.toBlob(doc2);
    const url = URL.createObjectURL(buffer);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `EcoRev_${ch.num}_${ch.title.slice(0,30).replace(/\s+/g,'_')}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  } catch(e) {
    console.error(e);
    alert('Erreur lors de la génération Word. Essaie depuis un autre navigateur.');
  }

  if (btn) { btn.disabled = false; btn.innerHTML = '📝 Word (.docx)'; }
}
