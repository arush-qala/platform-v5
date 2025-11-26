'use client'
title = "Category"
options = { CATEGORIES }
currentValue = { category }
onSelect = { onCategoryChange }
    />

    <DropdownModal
        isOpen={activeModal === 'season'}
        onClose={() => setActiveModal(null)}
        title="Season"
        options={SEASONS}
        currentValue={season}
        onSelect={onSeasonChange}
    />
        </>
    )
}
